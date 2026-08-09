export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum TOKEN_TYPES {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export enum OTPTypes {
  CONFIRMATION = "confirmation",
  RESET_PASSWORD = "reset_password"
}

export enum PaymentMethodsEnum {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
}

export enum OrderStatusEnum {
  PENDING = "pending",
  PLACED = "placed",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  RETURNED = "returned",
  REFUNDED="refunded",
  ON_WAY="on_way"

}