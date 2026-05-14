import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = 'http://localhost:3005/admin';  
  
  constructor(private http: HttpClient) { }
  
  getMessage(): Observable<any> {
    return this.http.get<any>(ApiEndPoints.category);
  }

  getBlogs():Observable<any> {
     return this.http.get<any>(ApiEndPoints.blogs)
  }

  getSubcategory(): Observable<any>{
    return this.http.get<any>(ApiEndPoints.subcategory);
  }

  getProducts(): Observable<any>{
    return this.http.get<any>(ApiEndPoints.products);
  }

  getFilterProducts(category:string | any,location:string | any): Observable<any>{
    const params = new HttpParams()
    .set('category', category)
    .set('location', location);
     return this.http.get<any>(`${ApiEndPoints.productFilter}`, { params });
  }

  getCompany(): Observable<any>{
    return this.http.get<any>(ApiEndPoints.getCompanyData);
  }
  
  updateCompanyData(companyId: number, companyData: any): Observable<any>{
    console.log('comp_data.....', companyData);
    let url = `${ApiEndPoints.postCompanyData}/${companyId}`;
    const updateData = companyData;
    return this.http.put<any>(url,updateData);
  }

  /*****************************Seller 03-April-2026***************************************/
  getSellerProducts():Observable<any>{
    return this.http.get<any>(ApiEndPoints.getSellerProducts);
  }

  saveSellerProducts(data: any):Observable<any>{
    return this.http.post<any>(`${ApiEndPoints.saveSellerProducts}`,data);
  }

  deleteSellerProducts(productId: any):Observable<any>{
    console.log('data+++++++++++++++', productId);
    return this.http.delete<any>(`${ApiEndPoints.deleteSellerProducts}?productId=${productId}`);
  }

  getSubCatOnSelectedCategory(mainId:any):Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getSellerCategories}/sub/${mainId}`);
  }

  getProductTypes(subId:any):Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getSellerCategories}/type/${subId}`);
  }

  getSellers():Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getSellers}`);
  }

  getSellersById(userId: any):Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getSellers}/${userId}`);
  }

  getProductById(productId: any):Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getSellerProductById}/${productId}`);
  }

  /**********************Seller Enquiry 29-04*****************************/
  getAllEnquiry():Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getAllEnquiry}`);
  }

  /**********************Admin 23-04-26********************************* */
  createCategory(data:any):Observable<any>{
    console.log('data==========', data);
    return this.http.post<any>(`${ApiEndPoints.createCategory}/main`,data);
  }

  getCategories():Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getCategories}/main`);
  }

  getSubCategories():Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getSubCategories}`);
  }

  getProductType():Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getProductType}`);
  }

  createProductType(data:any):Observable<any>{
    return this.http.post<any>(`${ApiEndPoints.createProductType}`,data);
  }

  updateSellerStatus(userId:any, data: any):Observable<any>{
    console.log('userId----', userId);
    console.log('data----', data);
    return this.http.put<any>(`${ApiEndPoints.sellarApprovalStaus}/${userId}`,data);
  }

  getAllProducts():Observable<any>{
    return this.http.get<any>(ApiEndPoints.getAllProducts);
  }

  bulkUpdateProductStatus(data:any):Observable<any>{
    return this.http.put<any>(`${ApiEndPoints.bulkUpdateProductStatus}/status`,data);
  }

  getEnquiryById(enquiryId:any):Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getEnquiryById}/${enquiryId}`,);
  }

  unlockContact(enquiryId:any):Observable<any>{
    return this.http.post<any>(`${ApiEndPoints.unlockContactByEnquiryId}/${enquiryId}/unlock`,'');
  }

  
  /**************************Admin Buyers 29-04-2026************************************ */
  getAllBuyers(): Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getAllBuyers}`);
  }

  getBuyerById(userId: any):Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getBuyerById}/${userId}`);
  }

  getAdminAllEnquiry():Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getAdminAllEnquiry}`);
  }

  getAllSubscriptionPlans():Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getAllSubscriptionPlans}`);
  }

  getSusbcriptionCreateOrder(data:any):Observable<any>{
    return this.http.post<any>(`${ApiEndPoints.getSusbcriptionCreateOrder}`,data);
  }

  verifySubscriptionPayment(data:any):Observable<any>{
    return this.http.post<any>(`${ApiEndPoints.verifySubscriptionPayment}`,data);
  }

  getCurrentPlan(sellerId:any):Observable<any>{
    return this.http.get<any>(`${ApiEndPoints.getCurrentPlan}/${sellerId}`);
  }

}
