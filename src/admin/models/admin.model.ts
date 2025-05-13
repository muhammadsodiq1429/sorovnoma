import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hashed_password: string;
  is_creator: boolean;
  is_active: boolean;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Admin uchun takrorlanmas ID",
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({
    type: "string",
    example: "Doston",
    description: "Admin`ning ismi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @ApiProperty({
    type: "string",
    example: "Soliyev",
    description: "Admin`ning familiyasi",
  })
  @Column({ type: DataType.STRING })
  declare last_name: string;

  @ApiProperty({
    type: "string",
    example: "dostonsoliyev2004@gamil.com",
    description: "Admin`ning elektron manzili",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({
    type: "string",
    example: "+998902909012",
    description: "Admin`ning ismi",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare phone: string;

  @ApiProperty({
    type: "string",
    description: "Admin`ning hashlangan paroli",
  })
  @Column({ type: DataType.STRING })
  declare hashed_password: string;

  @ApiProperty({
    type: "string",
    description: "Admin`ning hashlangan refresh tokeni",
  })
  @Column({ type: DataType.STRING })
  declare hashed_refresh_token: string;

  @ApiProperty({
    type: "string",
    example: false,
    description: "Admin`ning creatorligi",
  })
  @Column({ type: DataType.STRING, defaultValue: false })
  declare is_creator: boolean;

  @ApiProperty({
    type: "string",
    example: false,
    description: "Admin`ning activeligi", 
  })
  @Column({ type: DataType.STRING, defaultValue: true })
  declare is_active: boolean;
}
