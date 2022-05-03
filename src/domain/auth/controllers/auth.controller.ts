import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from '../services/auth.service';
import { RegisterFormDto } from '../dto/form/register.form.dto';
import { LoginFormDto } from "../dto/form/login.form.dto";
import { IToken } from "../intefaces/token.interface";
import { RegisterDoctorFormDto } from "../dto/form/register-doctor.form.dto";
import { JwtAuthGuard } from "../../../auth/guards/jwt.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() form: RegisterFormDto): Promise<void> {
    await this.authService.register(form);
  }

  @Post('login')
  async login(@Body() form: LoginFormDto): Promise<IToken> {
    return await this.authService.login(form);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/register/doctor')
  async registerDoctor(@Body() form: RegisterDoctorFormDto, @Req() req): Promise<void> {
    if (req.user.role === 'admin') {
    return await this.authService.registerDoctor(form);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }
}
