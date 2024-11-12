import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/tourist-plans/all`
//     );
//     const data = await response.json();

//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch tourist plans" });
//   }
// }
