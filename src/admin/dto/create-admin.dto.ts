import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    type: "string",
    example: "Doston",
    description: "Admin`ning ismi",
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    type: "string",
    example: "Soliyev",
    description: "Admin`ning familiyasi",
  })
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty({
    type: "string",
    example: "dostonsoliyev2004@gamil.com",
    description: "Admin`ning elektron manzili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: "string",
    example: "+998902909012",
    description: "Admin`ning ismi",
  })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: "string",
    example:"+998902909012d-S",
    description: "Admin`ning hashlangan paroli",
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: "string",
    example: false,
    description: "Admin`ning creatorligi",
  })
  @IsBoolean()
  @IsOptional()
  is_creator: boolean;

  @ApiProperty({
    type: "string",
    example: false,
    description: "Admin`ning activeligi",
  })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
