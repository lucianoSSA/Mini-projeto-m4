import express from "express"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const router = express.Router()



router.post('/coleta', async (req, res) => {
    
    try{
    const user = req.body

   const userDB = await  prisma.user.create({
        data: {
        email: user.email,
         name: user.name,
      //  address: user.address

        }
    })

    res.status(201).json(userDB)
   }
   catch(err){
    res.status(500).json ({message: "Deu merda"})
   }
})

 

 router.get('/coleta', async (req, res) => {

  const users =  await prisma.user.findMany()

    res.status(200).json(users)

  })

  router.put('/coleta/:id', async (req, res) => {

         await  prisma.user.uptade({

         where: {
             id: req.params.id
        }, 

        data: {
         email: req.body.email,
         name: req.body.name
      

      }
   })
    })

  router.delete('/coleta/:id', async (req, res)=>{

    await prisma.user.delete({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({message: "Ponto de coleta excluido"})

  })

  

  

  
  
export default router



