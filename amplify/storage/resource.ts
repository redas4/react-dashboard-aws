import { defineFunction, defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: 'amplifyDashboard',
  // access: (allow) => {
  //   'media/*': [
  //     allow.authenticated.to(['read', 'write', 'delete'])
  //   ]
  // },
  // triggers: {
  //   onUpload: defineFunction({
  //     entry: './on-upload-handler.ts'
  //   })
  // }
});