export interface HTTPExceptionObject {
  name: string;
  message: string;
}

export const buildHttpExceptionObject = (
  name: string,
  message: string,
): HTTPExceptionObject => ({ name, message });
