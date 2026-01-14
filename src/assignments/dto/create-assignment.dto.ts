import { IsNotEmpty, IsString, } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAssignmentDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsString()
  shiftId: number;

}
