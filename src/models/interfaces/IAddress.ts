
export default interface IAddress extends Document {
    streetName: string,
    houseNumber: string, // to support house numbers with apartments such as "Apartment A1"
    city: string,
    state: string
}