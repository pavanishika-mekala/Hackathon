package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import com.kony.PdfView;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class N_PDF extends JSLibrary {

 
 
	public static final String getPageNumber = "getPageNumber";
 
 
	public static final String openPDFByPageNumber = "openPDFByPageNumber";
 
	String[] methods = { getPageNumber, openPDFByPageNumber };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[0];
 return libs;
 }



	public N_PDF(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String filePath0 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 filePath0 = (java.lang.String)params[0];
 }
 ret = this.getPageNumber( filePath0 );
 
 			break;
 		case 1:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 Double pageNum1 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 pageNum1 = (Double)params[0];
 }
 ret = this.openPDFByPageNumber( pageNum1 );
 
 			break;
 		default:
			break;
		}
 
		return ret;
	}

	public String[] getMethods() {
		// TODO Auto-generated method stub
		return methods;
	}
	public String getNameSpace() {
		// TODO Auto-generated method stub
		return "PDF";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] getPageNumber( java.lang.String inputKey0 ){
 
		Object[] ret = null;
 Double val = new Double(com.kony.PdfView.downloadFilePdf( inputKey0
 ));
 
 			ret = new Object[]{val, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] openPDFByPageNumber( Double inputKey0 ){
 
		Object[] ret = null;
 java.lang.String val = com.kony.PdfView.createImg( inputKey0.intValue() );
 
 			ret = new Object[]{val, new Double(0)};
 		return ret;
	}
 
};
