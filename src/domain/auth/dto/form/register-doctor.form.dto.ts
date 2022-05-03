import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { RegisterFormDto } from "./register.form.dto";

export class RegisterDoctorFormDto extends RegisterFormDto{
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly cabinet: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly position: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly specializationID: string;
}
