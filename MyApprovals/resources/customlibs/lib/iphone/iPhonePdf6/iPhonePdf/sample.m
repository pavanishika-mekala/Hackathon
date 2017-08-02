#import "PDFPageRenderer.h"
#import "sample.h"
#import "fcntl.h"

@implementation TestClass

- (id) init{
	
	if( self = [super init] )
    {
        // Initialize your object here
    }
	return self;
}
static CGPDFDocumentRef pdfDoc=nil;
static NSInteger pagecount;
static NSString *pageNumber;
+ (NSString*) downloadFile:(NSString*) urltofile fileName:(NSString*) filename {
    
    NSString *name = urltofile;
    NSData  *urlData = [[NSData alloc] initWithBase64EncodedString:name options:0];
	
	CFDataRef myPDFData        = (CFDataRef)urlData;
	CGDataProviderRef provider = CGDataProviderCreateWithCFData(myPDFData);
	pdfDoc       = CGPDFDocumentCreateWithProvider(provider);		
	if(pdfDoc!=NULL)
	{
		pagecount=CGPDFDocumentGetNumberOfPages(pdfDoc);		
	}   
	pageNumber = [NSString stringWithFormat:@"{\"pageNo\":%i,\"filepath\":\"%@\"}",pagecount,filename];
	return pageNumber;
}


+ (NSString*) FileToDevice:(NSString*)base64String name:(NSString*) Name {
    NSString *name = base64String;
    NSData  *urlData = [[NSData alloc] initWithBase64EncodedString:name options:0];
    if ( urlData )
    {
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *documentsDirectory = [paths objectAtIndex:0];
        NSString *filePath = [NSString stringWithFormat:@"%@/%@", documentsDirectory,Name];
        [urlData writeToFile:filePath atomically:YES];
        NSLog(@"';';';';';';';';';';;';;';';';';';';';';';';The file is downloaded to the path %@",filePath);
	return filePath;
    }

}

+ (NSString*) openPage: (NSInteger) pageNo {
if(pageNo>pagecount||pageNo<1)
	return @"Invalid PageNo";
	CGPDFPageRef page=CGPDFDocumentGetPage(pdfDoc,pageNo);
	
	CGRect cropBox = CGPDFPageGetBoxRect(page, kCGPDFCropBox);
	int pageRotation = CGPDFPageGetRotationAngle(page);
	
	if ((pageRotation == 0) || (pageRotation == 180) ||(pageRotation == -180)) {
		UIGraphicsBeginImageContextWithOptions(cropBox.size, NO, 10 / 72); 
	}
	else {
		UIGraphicsBeginImageContextWithOptions(CGSizeMake(cropBox.size.height, cropBox.size.width), NO, 10 / 72); 
	}
	
	CGContextRef imageContext = UIGraphicsGetCurrentContext();   
	
    [PDFPageRenderer renderPage:page inContext:imageContext];
	
    UIImage *pageImage = UIGraphicsGetImageFromCurrentImageContext();  	
	
    UIGraphicsEndImageContext();
	
	NSString *signatureString = [UIImagePNGRepresentation(pageImage) base64EncodedStringWithOptions:0];
	NSLog(@"#########################################");
	NSLog(@"';';';';';';';';';';';';';';'';';';';Image generated is %@",signatureString);
	return signatureString;
	
	//else
	//return @"no img generated";
}

@end