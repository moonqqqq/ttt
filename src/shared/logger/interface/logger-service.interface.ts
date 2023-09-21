export abstract class ILoggerService {
  info: (data) => void;
  error: (err) => void;
  warn: (err) => void;
}
