#import <Foundation/Foundation.h>


@interface PDFPageRenderer : NSObject {

}

+ (void)renderPage:(CGPDFPageRef)page inContext:(CGContextRef)context;

+ (void)renderPage:(CGPDFPageRef)page inContext:(CGContextRef)context atPoint:(CGPoint)point;

+ (void)renderPage:(CGPDFPageRef)page inContext:(CGContextRef)context atPoint:(CGPoint)point withZoom:(float)zoom;

+ (void)renderPage:(CGPDFPageRef)page inContext:(CGContextRef)context inRectangle:(CGRect)rectangle;

@end