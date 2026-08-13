import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService {

    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    async createCheckOutSession({
        customer_email,
        metadata,
        line_items,
        discounts=[]
    }:Stripe.Checkout.SessionCreateParams ) {
        return await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email,
            metadata,
            line_items,
            discounts,
            success_url:'http://localhost:5000/success',
            cancel_url:'http://localhost:5000/cancel'
        })
    }

async createStripeCoupon({
    name,
    amount_off,
    currency,
    percent_off
}: Stripe.CouponCreateParams) {

    return await this.stripe.coupons.create({
        name,
        amount_off,
        percent_off,
        currency
    })
}
}