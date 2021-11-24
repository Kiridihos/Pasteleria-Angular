import Swal, { SweetAlertResult } from "sweetalert2";
export class AlertHelper {
  static alertaGuardar(mensaje:string) {
    Swal.fire({
      title: 'Nea, eres una chimba ',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Melo'
    });
  }

  static alertaBorrar():Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'Estás seguro, parce?',
      text: 'Esto no tiene vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Uy zonas',
      confirmButtonText: 'Sisas'
    });
  }

  static alertaCheck(mensaje: string) {
    Swal.fire({
      title: 'Error en los campos del formulario',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Uy, zonas'
    });
  }
}
