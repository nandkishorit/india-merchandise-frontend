export class ApiEndPoints {
    static readonly server_url: any = 'http://localhost:3005/admin';
    static readonly server_auth_url: any = 'http://localhost:3005/auth';
    static readonly seller_url: any = 'http://localhost:3005/seller'
    static readonly category: string = ApiEndPoints.server_url + `/category/listing`;
    static readonly blogs: string = ApiEndPoints.server_url + `/blog/listing`;
    static readonly subcategory: string = ApiEndPoints.server_url + `/subcategory/listing`;
    static readonly products:string = ApiEndPoints.server_url + `/product/listing`;
    //static readonly productFilter:string = ApiEndPoints.server_url +  `/product/:name`;
    static readonly productFilter:string = ApiEndPoints.server_url +  `/product`;
    static readonly getCompanyData:string = ApiEndPoints.server_url+ `/company/listing`;
    static readonly postCompanyData:string = ApiEndPoints.server_url+ `/company`;
    /*****************************************************************************/
    static readonly loginCredential: string = ApiEndPoints.server_auth_url+ `/login`;
    static readonly getRoleByEmail: string = ApiEndPoints.server_auth_url+ `/getRoleByEmail`;

    /****************************Seller 03-Apr-2026****************************************/
    static readonly getSellerProducts: string = ApiEndPoints.seller_url+ `/products`;
    static readonly saveSellerProducts: string = ApiEndPoints.seller_url+ `/products`;
    static readonly deleteSellerProducts: string = ApiEndPoints.seller_url+ `/products`;
    static readonly getSellers: string = ApiEndPoints.seller_url+ `/users`;
    static readonly getSellerProductById: string = ApiEndPoints.seller_url+ `/products`;
    static readonly getSellerCategories: string = ApiEndPoints.seller_url+ `/category`;
    static readonly sellarApprovalStaus: string = ApiEndPoints.seller_url+ `/approval`;
    static readonly getAllEnquiry: string = ApiEndPoints.seller_url+ `/enquiry`;
    static readonly getEnquiryById: string = ApiEndPoints.seller_url+ `/enquiry`;
    static readonly unlockContactByEnquiryId: string = ApiEndPoints.seller_url;
    static readonly getSusbcriptionCreateOrder: string = ApiEndPoints.seller_url+ `/subscription/create-order`;
    static readonly verifySubscriptionPayment: string = ApiEndPoints.seller_url+ `/subscription/verify-payment`;
    static readonly getCurrentPlan: string = ApiEndPoints.seller_url+ `/subscription/current-plan`;
    /*****************************admin 23-04-26********************************************/
    static readonly getCategories: string = ApiEndPoints.server_url+ `/category`;
    static readonly createCategory: string = ApiEndPoints.server_url+ `/category`;
    static readonly getSubCategories: string = ApiEndPoints.server_url+ `/subcategory/main`;
    static readonly getProductType: string = ApiEndPoints.server_url+ `/producttype/main`;
    static readonly createProductType: string = ApiEndPoints.server_url+ `/producttype/main`;
    static readonly getAllProducts: string = ApiEndPoints.server_url+ `/products`;
    static readonly bulkUpdateProductStatus: string = ApiEndPoints.server_url+ `/products`;
    static readonly getAllBuyers: string = ApiEndPoints.server_url+ `/buyers`;
    static readonly getBuyerById: string = ApiEndPoints.server_url+ `/buyers`;
    static readonly getAdminAllEnquiry: string = ApiEndPoints.server_url+ `/enquiry`;
    static readonly getAllSubscriptionPlans: string = ApiEndPoints.server_url+ `/subscriptionplan`;
    
}
