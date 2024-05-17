import { Request, Response } from 'express';
import { StudentServices } from './student.serivice';
import studentJoiValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Joi
    // --------------------------------------------
    /*   const nameSchema = Joi.object({
      firstName: Joi.string()
        .trim()
        .max(10)
        .regex(/^[A-Z][a-z]*$/, 'capitalize format')
        .required()
        .messages({
          'string.base': 'First Name should be a string',
          'string.empty': 'First Name is Required',
          'string.max': 'First Name should have a maximum length of 10',
          'string.pattern.name': 'First Name is not in capitalize format',
        }),
      middleName: Joi.string().trim().optional(),
      lastName: Joi.string()
        .trim()
        .regex(/^[A-Za-z]*$/)
        .required()
        .messages({
          'string.base': 'Last Name should be a string',
          'string.empty': 'Last Name is Required',
          'string.pattern.base': 'Last Name is not valid',
        }),
    });

    const guardianSchema = Joi.object({
      fatherName: Joi.string().trim().required().messages({
        'string.base': "Father's Name should be a string",
        'string.empty': "Father's Name is Required",
      }),
      fatherOccupation: Joi.string().trim().optional(),
      fatherContactNo: Joi.string().trim().required().messages({
        'string.base': "Father's No should be a string",
        'string.empty': "Father's No is Required",
      }),
      motherName: Joi.string().trim().required().messages({
        'string.base': "Mother's Name should be a string",
        'string.empty': "Mother's Name is Required",
      }),
      motherOccupation: Joi.string().trim().optional(),
      motherContactNo: Joi.string().trim().required().messages({
        'string.base': "Mother's No should be a string",
        'string.empty': "Mother's No is Required",
      }),
    });

    const localGuardianSchema = Joi.object({
      name: Joi.string().trim().required().messages({
        'string.base': "Local Guardian's Name should be a string",
        'string.empty': "Local Guardian's Name is Required",
      }),
      occupation: Joi.string().trim().optional(),
      contactNo: Joi.string().trim().required().messages({
        'string.base': "Local Guardian's Contact No should be a string",
        'string.empty': "Local Guardian's Contact No is Required",
      }),
    });

    const studentSchema = Joi.object({
      id: Joi.string().required().messages({
        'string.base': 'ID should be a string',
        'string.empty': 'ID is Required',
      }),
      name: nameSchema.required().messages({
        'any.required': 'Name is Required',
      }),
      gender: Joi.string().valid('male', 'female').required().messages({
        'any.only': '{#label} is not supported',
        'string.empty': 'Gender is Required',
      }),
      dateOfBirth: Joi.string().trim().required().messages({
        'string.base': 'Date of Birth should be a string',
        'string.empty': 'DOB is Required',
      }),
      email: Joi.string().trim().email().required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email is Required',
        'string.email': '{#value} is not in email format',
      }),
      contactNumber: Joi.string().trim().required().messages({
        'string.base': 'Contact Number should be a string',
        'string.empty': 'Contact No is Required',
      }),
      emergencyContactNumber: Joi.string().trim().required().messages({
        'string.base': 'Emergency Contact Number should be a string',
        'string.empty': 'Emergency No is Required',
      }),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
        .optional(),
      presentAddress: Joi.string().trim().required().messages({
        'string.base': 'Present Address should be a string',
        'string.empty': 'Present address is Required',
      }),
      permanentAddress: Joi.string().trim().required().messages({
        'string.base': 'Permanent Address should be a string',
        'string.empty': 'Permanent is Required',
      }),
      guardian: guardianSchema.required().messages({
        'any.required': 'Guardian is Required',
      }),
      localGuardian: localGuardianSchema.required().messages({
        'any.required': 'Local Guardian is Required',
      }),
      profileImage: Joi.string().optional(),
      isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active')
        .messages({
          'any.only': '{#label} is not supported',
        }),
    }); */

    // --------------------------------------------

    const student = req.body.student;

    const { error, value } = studentJoiValidationSchema.validate(student);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Unable to Process the Request To Create Student',
        error: error.details,
      });
    }
    // console.log('log at127', error, value);

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
