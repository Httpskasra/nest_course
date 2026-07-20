import { Type } from 'class-transformer';
import { ArrayMinSize, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @ArrayMinSize(1)
  @Type(() => CreateOrderItemDto)
  @ValidateNested({ each: true })
  items: CreateOrderItemDto[];
}
