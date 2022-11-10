import { prisma } from '../../../database/prisma';

import { MessagingAdapter } from "../../../application/adapters/messaging-adapter";

interface IUnlockUser {
  username: string;
}

export class UnlockUserModel {
  constructor(
    private messagingAdapter: MessagingAdapter,
  ) {}
  
  message = "unlocked user"

  async execute({ username }: IUnlockUser) {
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });
   
    if (!user) {
      throw new Error('Username invalid!');   
    }    
    
    if (user.blocked) {
      console.log('unlocked user ' + username ); 
    }

    const updateUser = await prisma.users.update({
      where: {
        username,
      },
      data: {
        blocked: false,
      },
    })

    //Verificar
    console.log(updateUser)
      
    await this.messagingAdapter.sendMessage('authentications.new-authorization', {
      user: {
        username: username,
        message: "unlocked user",
      }
    })      

    }

}