import { prisma } from '../../../database/prisma';

import { MessagingAdapter } from "../../../application/adapters/messaging-adapter";

interface IUnlockUser {
  username: string;
}

export class UnlockUserModel {
  constructor(
    private messagingAdapter: MessagingAdapter,
  ) {}
  
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
     
    await this.messagingAdapter.sendMessage('authentications.new-authorization', {
      user: {
        username: username,
        message: "unlocked user",
      }
    })      

  }

  async update({ username }: IUnlockUser) {
    const updateUser = await prisma.users.update({
      where: {
        username,
      },
      data: {
        blocked: false,
        failed: 0,
      },
    })
  } 

}