import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RefreshTokenDto, RefreshTokenResponseDto } from './dto/refresh.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, phone, password } = loginDto;

    if (!email && !phone) {
      throw new BadRequestException('Email or phone is required');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        langPref: user.langPref,
      },
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshTokenResponseDto> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(
        refreshTokenDto.refreshToken,
        {
          secret: this.configService.get<string>('REFRESH_SECRET') || 'refresh-secret',
        },
      );

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return await this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: any) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email || undefined,
      phone: user.phone || undefined,
      role: user.role,
    };

    // Parse TOKEN_TTL - can be number (seconds) or string (e.g., "15m", "900s")
    const tokenTtl = this.configService.get<string>('TOKEN_TTL') || '15m';
    const tokenTtlFormatted = typeof tokenTtl === 'string' && /^\d+$/.test(tokenTtl) 
      ? `${tokenTtl}s`  // Append 's' for seconds if it's a numeric string
      : tokenTtl;

    // Parse REFRESH_TTL - can be number (seconds) or string (e.g., "14d", "1209600s")
    const refreshTtl = this.configService.get<string>('REFRESH_TTL') || '14d';
    const refreshTtlFormatted = typeof refreshTtl === 'string' && /^\d+$/.test(refreshTtl)
      ? `${refreshTtl}s`  // Append 's' for seconds if it's a numeric string
      : refreshTtl;

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET') || 'your-secret-key',
      expiresIn: tokenTtlFormatted,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_SECRET') || 'refresh-secret',
      expiresIn: refreshTtlFormatted,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        langPref: true,
      },
    });
  }
}

