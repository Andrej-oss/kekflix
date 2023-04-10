export interface Subscription {

    id: string,
    object: string,
    application: string | null,
    application_fee_amount: string | null,
    automatic_tax: {
    enabled: boolean,
        status: string | null
},
    billing_cycle_anchor: number,
    billing_thresholds: {} | null,
    cancel_at: {} | null,
    cancel_at_period_end: boolean,
    canceled_at: {} | null,
    cancellation_details: {
        comment: {} | null,
        feedback: {} | null,
        reason: {} | null
    },
    collection_method: string,
    created: number,
    currency: string,
    current_period_end: number,
    current_period_start: number,
    customer: string,
    default_payment_method: string | null,
    default_source: string | null,
    default_tax_rates: [],
    description: string | null,
    discount: string | null,
    ended_at: {} | null,
    items: {
        object: string,
        data: [
            {
                id: string,
                object: string,
                billing_thresholds: {} | null,
                created: number,
                metadata: {} | null,
                plan: {
                    id: string,
                    object: string,
                    active: boolean,
                    aggregate_usage: {} | null,
                    amount: number,
                    amount_decimal: number,
                    billing_scheme: string,
                    created: number,
                    currency: string,
                    interval: string,
                    interval_count: number,
                    livemode: boolean,
                    metadata: {} | null,
                    nickname: {} | null,
                    product: string,
                    tiers_mode: {} | null,
                    transform_usage: {} | null,
                    trial_period_days: {} | null,
                    usage_type: string
                },
                price: {
                    id: string,
                    object: string,
                    active: boolean,
                    billing_scheme: string,
                    created: number,
                    currency: string,
                    custom_unit_amount: {} | null,
                    livemode: boolean,
                    lookup_key: {} | null,
                    metadata: {} | null,
                    nickname: {} | null,
                    product: string,
                    recurring: {
                        aggregate_usage: {} | null,
                        interval: string,
                        interval_count: number,
                        trial_period_days: {} | null,
                        usage_type: string
                    },
                    tax_behavior: string,
                    tiers_mode: {} | null,
                    transform_quantity: {} | null,
                    type: string,
                    unit_amount: number,
                    unit_amount_decimal: string
                },
                quantity: number,
                subscription: string,
                tax_rates: []
            }
        ],
        has_more: boolean,
        total_count: number,
        url: string
    },

    latest_invoice: string,
    livemode: boolean,
    metadata: {},
    on_behalf_of: {} | null,
    pause_collection: {} | null,
    payment_settings: {
        payment_method_options: {} | null,
        payment_method_types: {} | null,
        save_default_payment_method: string
    },
    pending_invoice_item_interval: {} | null,
    pending_setup_intent: {} | null,
    pending_update: {} | null,
    plan: {
        id: string,
        object: string,
        active: boolean,
        aggregate_usage: {} | null,
        amount: number,
        amount_decimal: string,
        billing_scheme: string,
        created: number,
        currency: string,
        interval: string,
        interval_count: number,
        livemode: boolean,
        metadata: {} | null,
        nickname: {} | null,
        product: string,
        tiers_mode: {} | null,
        transform_usage: {} | null,
        trial_period_days: {} | null,
        usage_type: string
    },
    quantity: number,
    schedule: {} | null,
    start_date: number,
    status: string,
    test_clock: {} | null,
    transfer_data: {} | null,
    trial_end: {} | null,
    trial_settings: {
        end_behavior: {
            missing_payment_method: string
        }
    },
    trial_start: {} | null
}