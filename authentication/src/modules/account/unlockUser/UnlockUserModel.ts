import { prisma } from '../../../database/prisma';

import { MessagingAdapter } from "../../../application/adapters/messaging-adapter";

interface IUnlockUser {
  username: string;
}

export class UnlockUserModel {
  constructor(
    private messagingAdapter: MessagingAdapter,
  ) {}
  
  message = "authenticated"

  async execute({ username }: IUnlockUser) {
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });
   
    if (!user) {
      throw new Error('Username or password invalid!');   
    }    
    
    if (user.blocked) {
      console.log('Username ' + username + ' unlock!'); 
    }
      
      const record = await prisma.records.create({
        data: {
          username,
          message: "unlock",
        },
      })     

    }

    // await this.messagingAdapter.sendMessage('authentications.new-authorization', {
    //   user: {
    //     username: username,
    //     message: "unlock",
    //   }
    // })      
    
//     return token;
//   }

}