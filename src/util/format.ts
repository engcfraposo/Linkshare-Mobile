import numeral from 'numeral';
import 'numeral/locales';

export const formatPrice = (value: number): string => {
  numeral.locale('pt-br');
  return numeral(value).format('$0.0,');
};
