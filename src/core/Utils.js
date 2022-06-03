export const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
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
const strval = "dhdrhdrhdjjhbjnjnjnjnj|_||__/\\/xdfgrg--===\=|="
export const encrypt = (data) => {
	let mensx="";
	let l;
	let i;
	let j=0;
	let ch;
	ch = strval;
	for (i=0;i<data.length; i++){
		j++;
		l=(Asc(data.substr(i,1))+(Asc(ch.substr(j,1))));
		if (j==50){
			j=1;
		}
		if (l>255){
			l-=256;
		}
		mensx+=(Chr(l));
	}
	return btoa(mensx);
}
export const decrypt = (data) => {
	data = atob(data)
	let mensx="";
	let l;
	let i;
	let j=0;
	let ch;
	ch = strval;
	for (i=0; i<data.length;i++){
		j++;
		l=(Asc(data.substr(i,1))-(Asc(ch.substr(j,1))));
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
const Asc = (String) => String.charCodeAt(0);
const Chr = (AsciiNum) => String.fromCharCode(AsciiNum);
export const uint8arrayEncode = (value) => new TextEncoder("utf-8").encode(value);
export const uint8arrayDecode = (value) => new TextDecoder().decode(value);