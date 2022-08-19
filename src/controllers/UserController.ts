import { Response,Request } from 'express'
import { User } from '../model/User'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'

export class UserController{

    async register(req:Request, res:Response){
        const {name, email, password,confirmPassword} = req.body
 
    
        const user = await User.findOne({email:email})
        if(user){
        
            return res.status(404).json({message : "Incorrect Function"})
        }
    
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
    
        const userBd = new User ({
            name,
            email,
            password:passwordHash
        })
        
        
    
        try{
            await userBd.save()
            res.send(200)
        
        }catch(error){

            res
            .send(500)
            .json({
                msg: 'Ocorreu um erro !'
            })
        }


    }
    async login(req:Request, res:Response){
        const {email,password} = req.body   

        if(!email || !password){
            return res.status(400).send('Fields Empty')
        }

        const user = await User.findOne({
            email:email
        })

        if(!user){
            return res.status(400).json({msg:'User not found' })
        }
    

        const checkPassword = await bcrypt.compare(password,String(user.password))

        if(!checkPassword){
            return res.status(404).json({msg:'User not found' })
        }

        try{
            const secret = String(process.env.SECRET)

            const token = jwt.sign({
            id:user.id
            },
            secret,
            {
                expiresIn: '2m'
            }

        )

        res.status(200).json({msg: "Autenticação feita com sucesso", token})

        }catch(err){
            res.status(400)
        }


    }
    async findUsers(req:Request, res:Response){
        const users = await User.find()

        return res.json(users)


    }
    async findId(req:Request, res:Response){
        const id = req.params.id

        const user = await User.findById(id, '-password')
    
        if(!user){
            return res.status(400).json({msg:'User not found' })
        }
    
        return res.json(user)
    

    }






}