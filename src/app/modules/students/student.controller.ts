import { Request, Response } from 'express';
import { StudentServices } from './student.serivice';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    // creating a schema validation using Joi
    const joiValidationSchema = Joi.object({
      id: Joi.string(),
      name: {
        firstName: Joi.string().max(20).required(),
        middleName: Joi.string().max(20),
        lastName: Joi.string().max(20).required(),
      },
      gender: Joi.string().required().valid(['male', 'female']),
    });

    //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(student);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Unable to Process the Request To Create Student',
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Getting All The Student Was Successful',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Unable to Process the Request To Get All the Students',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getStudentFromDBById(id);
    res.status(200).json({
      success: true,
      message: 'Getting single Student Was Successful',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Unable to Process the Request To Get All the Students',
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
