import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsPhoneNumber("UZ")
  phone_number?: string;

  @IsString()
  @IsOptional()
  profile_image?: string;

  @IsBoolean()
  @IsOptional()
  is_verified?: boolean;

  @IsBoolean()
  @IsOptional()
  is_creator?: boolean;
}
