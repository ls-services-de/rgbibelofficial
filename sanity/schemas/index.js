



import answersSchema from "./answers-schema";
import bewertungSchema from "./bewertung-schema";
import categorySchema from "./category-schema";
import componentSchema from "./component-schema";
import contactSchema from "./contact-schema";
import orderSchema from "./order-schema";
import overlaySchema from "./overlay-schema";
import product from "./product-schema";
import questionsSchema from "./questions-schema";
import repairRequest from "./repairRequest";

const schemas = [product, orderSchema, categorySchema, componentSchema,repairRequest, questionsSchema,answersSchema, contactSchema, overlaySchema,bewertungSchema ];

export default schemas;