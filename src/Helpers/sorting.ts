export default function Sorting(arr: any[]) {
  if (arr?.length === 0 || !arr) {
    return [];
  } else {
    return arr.sort(function compare(a, b) {
      var dateA: any = new Date(a.updatedAt);
      var dateB: any = new Date(b.updatedAt);
      return dateB - dateA;
    });
  }
}
