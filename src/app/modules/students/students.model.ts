import { Schema, model } from 'mongoose';
import { Guardian, IStudent, LocalGuardian, Name } from './students.interface';

const userNameSchema = new Schema<Name>({
  firstName: { type: String, required: [true, 'First Name is Required'] },
  middleName: { type: String, required: false },
  lastName: { type: String, required: [true, 'Last Name is Required'] },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, "Father's Name is Required"] },
  fatherOccupation: { type: String, required: false },
  fatherContactNo: {
    type: String,
    required: [true, "Father's No is Required"],
  },
  motherName: { type: String, required: [true, "Mother's no is Required"] },
  motherOccupation: { type: String, required: false },
  motherContactNo: {
    type: String,
    required: [true, "Mother's No is Required"],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, "Local Guardian's Name is Required"] },
  occupation: { type: String, required: false },
  contactNo: {
    type: String,
    required: [true, "Local Guardian's Contact no is Required"],
  },
});

const studentSchema = new Schema<IStudent>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: [true, 'Name is Required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: `{VALUE} is not supported`,
    },
    required: [true, 'Gender is Required'],
  },
  dateOfBirth: { type: String, required: [true, 'DOB is Required'] },
  email: { type: String, required: [true, 'Email is Required'], unique: true },
  contactNumber: { type: String, required: [true, 'Contact No is Required'] },
  emergencyContactNumber: {
    type: String,
    required: [true, 'Emergency No is Required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is Required'],
  },
  permanentAddress: { type: String, required: [true, 'Permanent is Required'] },
  guardian: { type: guardianSchema, required: [true, 'Guardian is Required'] },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian is Required'],
  },
  profileImage: { type: String, required: false },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    // required: true,
  },
});

const Student = model<IStudent>('Student', studentSchema);

export default Student;
