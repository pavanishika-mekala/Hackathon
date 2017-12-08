
@interface TestClass : NSObject

+(NSString*) downloadFile:(NSString*) urltofile fileName:(NSString*) filename;
+(NSString*) openPage: (NSInteger) pageNo;
+(NSString*) FileToDevice:(NSString*) base64String name:(NSString*) Name;

@end