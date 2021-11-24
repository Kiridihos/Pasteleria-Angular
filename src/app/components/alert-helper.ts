import Swal, { SweetAlertResult } from "sweetalert2";
export class AlertHelper {
  static alertaGuardar(mensaje:string) {
    Swal.fire({
      position: 'top-end',
      background: '#FFD1D1',
      toast: true,
      timer: 5000,
      timerProgressBar: true,
      title: 'Nea, eres una chimba ',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Melo'
    });
  }

  static alertaBorrar():Promise<SweetAlertResult<any>> {
    return Swal.fire({
      background: '#FFD1D1',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: '¿Estás seguro, parce?',
      text: 'Esto no tiene vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Uy zonas',
      confirmButtonText: 'Sisas'
    });
  }

  static alertaCheck(mensaje: string) {
    Swal.fire({
      position: 'top-end',
      background: '#FFD1D1',
      toast: true,
      timer: 5000,
      timerProgressBar: true,
      title: 'La cagaste, mijito',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Uy, zonas'
    });
  }
}
