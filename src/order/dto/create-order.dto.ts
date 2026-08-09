import { IsEnum, IsString } from "class-validator";
import { PaymentMethodsEnum } from "src/Common";

export class CreateOrderDto {

  @IsString()
  address: string;
 @IsString()
  phone: string;
  @IsEnum(PaymentMethodsEnum)
  paymentMethod: string;
}