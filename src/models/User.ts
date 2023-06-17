import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
    direccion: string;
    telefono: Array<{
        type: string;
        numero: string;
    }>;
    email: string;
    ciudad: string;
    estado: string;
    pais: string;
    codigoPostal: string;
}

const ContactSchema = new Schema({
    direccion: { type: String },
    telefono: [
        {
            type: { type: String },
            numero: { type: String },
        },
    ],
    email: { type: String, required: true },
    ciudad: { type: String },
    estado: { type: String },
    pais: { type: String },
    codigoPostal: { type: String },
});

export interface IUser extends Document {
    nombreCompleto: string;
    puestoTrabajo: string;
    permisos: {
        admin: {
            puedeEditar: boolean;
            puedeEliminar: boolean;
            puedeCrear: boolean;
        },
        user: {
            puedeEditar: boolean;
            puedeEliminar: boolean;
            puedeCrear: boolean;
        }
    };
    tiendas: Array<{
        nombre: string;
        ubicacion: string;
        telefono: Array<{
            type: string;
            numero: string;
        }>;
    }>;
    security: {
        password: string;
        resetPasswordToken: string | undefined;
        resetPasswordExpires: Date | undefined;
        googleId: string;
        facebookId: string;
    };
    contact: IContact;
    contac: IContact;
}

const UserSchema = new mongoose.Schema({
    nombreCompleto: { type: String, required: true },
    puestoTrabajo: { type: String, required: true },
    permisos: {
        admin: {
            puedeEditar: { type: Boolean, default: false },
            puedeEliminar: { type: Boolean, default: false },
            puedeCrear: { type: Boolean, default: false },
        },
        user: {
            puedeEditar: { type: Boolean, default: false },
            puedeEliminar: { type: Boolean, default: false },
            puedeCrear: { type: Boolean, default: false },
        },
    },
    tiendas: [
        {
            nombre: { type: String, required: true },
            ubicacion: { type: String, required: true },
            telefono: [
                {
                    type: { type: String },
                    numero: { type: String },
                },
            ],
        },
    ],
    security: {
        password: { type: String, required: true },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
        googleId: { type: String },
        facebookId: { type: String },
    },
    contact: { type: ContactSchema, required: true },
    contac: { type: ContactSchema, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
