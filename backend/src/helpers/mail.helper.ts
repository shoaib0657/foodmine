import { getClient } from "../configs/mail.config";
import { Order } from "../models/order.model";
import { UserModel } from "../models/user.model";


/**
 * Sends an email receipt for the given order.
 * @param order - The order for which the receipt is being sent.
 */
export const sendEmailReceipt = async function(order: Order) {
    const mailClient = getClient();

    const user = await UserModel.findById(order.user);
    if (!user) {
        console.error(`User with id ${order.user} not found`);
        return;
    }

    const userEmail = user.email;

    // console.log(user);

    mailClient.messages
        .create(process.env.MAIL_DOMAIN!, {
            from: 'orders@foodmine.com',
            to: userEmail,
            // to: 'mdshoaibansari0307@gmail.com',
            subject: `Order ${order.id} is being processed`,
            html: getReceiptHtml(order),
        })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error
};

const getReceiptHtml = function (order: Order) {
    return `
    <html>
      <head>
        <style>
        table {
          border-collapse: collapse;
          max-width:35rem;
          width: 100%;
        }
        th, td{
          text-align: left;
          padding: 8px;
        }
        th{
          border-bottom: 1px solid #dddddd;
        }
        </style>
      </head>
      <body>
        <h1>Order Payment Confirmation</h1>
        <p>Dear ${order.name},</p>
        <p>Thank you for choosing us! Your order has been successfully paid and is now being processed.</p>
        <p><strong>Tracking ID:</strong> ${order.id}</p>
        <p><strong>Order Date:</strong> ${order.createdAt
          .toISOString()
          .replace('T', ' ')
          .substr(0, 16)}</p>
          <h2>Order Details</h2>
          <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
          ${order.items
            .map(
              item =>
                `
              <tr>
              <td>${item.food.name}</td>
              <td>$${item.food.price}</td>
              <td>${item.quantity}</td>    
              <td>$${item.price.toFixed(2)}</td>
              </tr>
              `
            )
            .join('\n')}
            </tbody>
            <tfoot>
            <tr>
            <td colspan="3"><strong>Total:</strong></td>
            <td>$${order.totalPrice}</td>
            </tr>
            </tfoot>
            </table>
            <p><strong>Shipping Address:</strong> ${order.address}</p>
          </body>
        </html>
      
      `;
  };
