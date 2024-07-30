import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto, SignupAuthDto } from './dto'
import { Tokens, User } from './types'
import { RtGuard } from 'src/common/guards'
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto: SignupAuthDto): Promise<Tokens> {
        return this.authService.signupLocal(dto)
    }

    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: AuthDto): Promise<User> {
        return this.authService.signinLocal(dto)
    }

    @Post('signout')
    @HttpCode(HttpStatus.OK)
    signout(@GetCurrentUserId() userId: string): Promise<boolean> {
        return this.authService.signout(userId)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(
        @GetCurrentUserId() userId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<Tokens> {
        return this.authService.refreshToken(userId, refreshToken)
    }
}
