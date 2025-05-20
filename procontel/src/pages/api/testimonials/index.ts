import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

type Data = {
  message?: string;
  error?: string;
  testimonials?: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  switch (req.method) {
    case 'GET':
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`);
        const data = await response.json();
        res.status(200).json({ testimonials: data });
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener testimonios' });
      }
      break;

    case 'POST':
      if (!session) {
        return res.status(401).json({ error: 'No autorizado' });
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });

        if (!response.ok) {
          throw new Error('Error al crear testimonio');
        }

        const data = await response.json();
        res.status(201).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear testimonio' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
} 