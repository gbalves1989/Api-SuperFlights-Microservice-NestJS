import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsDate } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class FlightDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly pilot: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly airplane: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly destinationCity: string

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  readonly flightDate: Date
}
