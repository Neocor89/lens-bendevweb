import { useMutation } from "@tanstack/react-query"

export default function useCreatePost() {
  async function createPost(
    image: File,
    title: string,
    description: string,
    content: string,
  ) {

    //* Ask Lens to give us the type Data


    //* Sign the typed Data
    //* Use the signed Data to the Send the transaction to the smart contract 
    //* Upload Media
  }

  //@ts-ignore
  return useMutation(createPost);
}