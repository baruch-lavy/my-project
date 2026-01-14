import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createAdminDto {
  @ApiProperty({ example: "Azam" })
  @IsNotEmpty()
  @IsString()
  userame: string;

  @ApiProperty({ example: "abdusalomovdev@gmail.com" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "12345678" })
  @IsNotEmpty()
  @IsString()
  password: string;

}
