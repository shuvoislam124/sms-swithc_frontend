import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/account/login/login.service';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  httpOptions = {
    'responseType': 'arraybuffer' as 'json'
  };

  constructor(
    private messageService: MessageService,
    private _HttpClient: HttpClient,
    private _loginService: LoginService,
    private router: Router
  ) { }

  HandleError(error: any) {
    if (error.status === HttpStatusCode.NotFound) {
      this.showError('Could Not Connect To Server', 'Connection Error', true)
    } else if (error.status === 0) {
      this.showError('Could Not Connect To Server', 'Connection Error', true)
    } else if (error.status === HttpStatusCode.BadRequest) {
      this.showError('Your provided data is not valid', 'Invalid Data')
    } else if (error.status === HttpStatusCode.MethodNotAllowed) {
      this.showError('Request Method Verb is incorrect', 'Http Error')
    } else if (error.status === HttpStatusCode.UnsupportedMediaType) {
      this.showError('Unsupported Media', 'Http Error')
    } else if (error.status === HttpStatusCode.InternalServerError) {
      if (error.error && error.error.message) {
        this.showError(error.error.message, 'Server Error', true)
      } else
        this.showError('Something went wrong on the server', 'Server Error', true);
    } else if (error.status === HttpStatusCode.Unauthorized) {
      this.showInfo('Session Expired. Please Login again', 'Session Expired');
      this.router.navigate(['login']);
    } else if (error.status === HttpStatusCode.Forbidden) {
      this.showInfo('You Do Not have Permission', 'Forbidden');
    } else {
      console.log(error);
      this.showError('Unknown Error Occurred')
    }
  }

  HandleSuccessMessage(response: any) {
    if (response.statusCode === HttpStatusCode.BadRequest)
      this.showError(response.message, 'Invalid Data');
    else if (response.statusCode === HttpStatusCode.InternalServerError)
      this.showError(response.message, 'Server Error');
    else if (response.statusCode === HttpStatusCode.NoContent)
      this.showError(response.message, 'No Content');
    else if (response.statusCode === HttpStatusCode.NotModified)
      this.showWarn(response.message, 'Not Modified');
    else if (response.statusCode === 'S400') {
      this.showError(response.message, 'Information');
      this.router.navigate(['account/suspended']);
    }
    else
      this.showInfo(response.message, 'Information');
  }

  showSuccess(detail: string, summary?: string, sticky?: boolean) {
    this.clear();
    this.messageService.add({
      severity: 'success',
      summary: summary ? summary : 'Success',
      detail: detail,
      sticky: sticky ? sticky : false
    });
  }

  showInfo(detail: string, summary?: string, sticky?: boolean) {
    this.clear();
    this.messageService.add({
      severity: 'info',
      summary: summary ? summary : 'Info',
      detail: detail,
      sticky: sticky ? sticky : false
    });
  }

  showWarn(detail: string, summary?: string, sticky?: boolean) {
    this.clear();
    this.messageService.add({
      severity: 'warn',
      summary: summary ? summary : 'Warning',
      detail: detail,
      sticky: sticky ? sticky : false
    });
  }

  showError(detail: string, summary?: string, sticky?: boolean) {
    this.clear();
    this.messageService.add({
      severity: 'error',
      summary: summary ? summary : 'Error',
      detail: detail,
      sticky: sticky ? sticky : false
    });
  }

  showCustom(detail: string, summary: string, sticky?: boolean) {
    this.clear();
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
      sticky: sticky ? sticky : false
    });
  }

  clear() {
    this.messageService.clear();
  }

  GetFile(url: string) {
    return this._HttpClient.get<any>(encodeURIComponent(url));
  }

  CreateImgPath = (serverPath: string) => {
    serverPath = serverPath.replace('', '');
    serverPath = serverPath.replace('', '');
    return `${apiUrl.replace('/api', '')}${serverPath.replace('', '')}`;
  }
}
