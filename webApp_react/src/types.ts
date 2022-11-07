export type Exam = {
    id: number,
    name: string
}


export type Structure = {
    name: string,
    region: string,
    city:string,
    phone: string,
    examsId:[]
}

export const initialExam = {
    id: 0,
    name: ""
}

export const  initialStructure = {
    name: "",
    region: "",
    city:"",
    phone: "",
    examsId:[]
}