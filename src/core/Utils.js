export const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")
export const getParams = match => {
  if (match.result === undefined) {
    return
  }
  const values = match.result.slice(1)
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])
  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]]
  }))
}
const strval = 'assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm'
export const encrypt = (dados) => {
	let mensx="";
	let l;
	let i;
	let j=0;
	let ch;
	ch = strval;
	for (i=0;i<dados.length; i++){
		j++;
		l=(Asc(dados.substr(i,1))+(Asc(ch.substr(j,1))));
		if (j==50){
			j=1;
		}
		if (l>255){
			l-=256;
		}
		mensx+=(Chr(l));
	}
	return mensx;
}
export const decrypt = (dados) => {
	let mensx="";
	let l;
	let i;
	let j=0;
	let ch;
	ch = strval;
	for (i=0; i<dados.length;i++){
		j++;
		l=(Asc(dados.substr(i,1))-(Asc(ch.substr(j,1))));
		if (j==50){
			j=1;
		}
		if (l<0){
			l+=256;
		}
		mensx+=(Chr(l));
	}
	return mensx;
}
export const Asc = (String) => {
	return String.charCodeAt(0);
}
export const Chr = (AsciiNum) => {
	return String.fromCharCode(AsciiNum)
}