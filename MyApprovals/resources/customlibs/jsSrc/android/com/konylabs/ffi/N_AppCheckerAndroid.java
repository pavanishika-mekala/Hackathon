package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import com.kony.CheckAppExist;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class N_AppCheckerAndroid extends JSLibrary {

 
	String[] methods = { };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[1];
 libs[0] = new checkifExist();
 return libs;
 }



	public N_AppCheckerAndroid(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 try {
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		default:
			break;
		}
 }catch (Exception e){
			ret = new Object[]{e.getMessage(), new Double(101), e.getMessage()};
		}
		return ret;
	}

	public String[] getMethods() {
		// TODO Auto-generated method stub
		return methods;
	}
	public String getNameSpace() {
		// TODO Auto-generated method stub
		return "AppCheckerAndroid";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 


class checkifExist extends JSLibrary {

 
 
	public static final String appInstalledOrNot = "appInstalledOrNot";
 
	String[] methods = { appInstalledOrNot };

	public Object createInstance(final Object[] params) {
 return new com.kony.CheckAppExist(
 (java.lang.String)params[0] );
 }


	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 try {
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen < 0 || paramLen > 1){ return new Object[] {new Double(100),"Invalid Params"};}
 inc = 1;
 
 ret = this.appInstalledOrNot(params[0]
 );
 
 			break;
 		default:
			break;
		}
 }catch (Exception e){
			ret = new Object[]{e.getMessage(), new Double(101), e.getMessage()};
		}
		return ret;
	}

	public String[] getMethods() {
		// TODO Auto-generated method stub
		return methods;
	}
	public String getNameSpace() {
		// TODO Auto-generated method stub
		return "checkifExist";
	}

	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] appInstalledOrNot( Object self ){
 
		Object[] ret = null;
 Boolean val = new Boolean(((com.kony.CheckAppExist)self).appInstalledOrNot( ));
 
 			ret = new Object[]{val, new Double(0)};
 		return ret;
	}
 
}

};
