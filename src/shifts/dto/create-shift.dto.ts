import { IsNotEmpty, IsOptional, IsString, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateShiftDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  endTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

}
