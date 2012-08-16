package com.mpro.liquidacion;

import java.io.File;
import com.samsung.sdraw.CanvasView;
import com.samsung.sdraw.SettingView;
import com.samsung.sdraw.example1.ExampleUtils;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Base64;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;
public class Firma extends Activity {
    public static final String TAG = "Ingrese Firma";
    public static final String DEFAULT_APP_DIRECTORY = "/mnt/sdcard/Application/SDraw/Firma";
    public static final String DEFAULT_APP_IMAGEDATA_DIRECTORY = DEFAULT_APP_DIRECTORY + "/image";
    public static final String EXTRA_IMAGE_PATH = "path";
    public static final String EXTRA_IMAGE_NAME = "filename";
    public static final String SAVED_FILE_EXTENSION = "png";
    private CanvasView mCanvasView;
    private SettingView mSettingView;
    private File mFolder = null;
    
     @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.example1_main);
        mCanvasView = (CanvasView) findViewById(R.id.canvas_view);
        mSettingView = (SettingView) findViewById(R.id.setting_view);
        mCanvasView.setSettingView(mSettingView);
        mFolder = new File(DEFAULT_APP_IMAGEDATA_DIRECTORY);  
        
        mCanvasView.setInitializeFinishListener(mInitializeFinishListener);
   }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.example1_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        super.onOptionsItemSelected(item);
        switch (item.getItemId()) {
        case R.id.options_clear:
        	limpiarfirma();
        	return true;
        case R.id.options_save:
        	Intent i = new Intent(this,MainActivity.class);
        	startActivity(i);
         return true;

        case R.id.options_load:
        	if(saveCanvas()){
        		Toast.makeText(this, "La firma se ha almacenado correctamente", Toast.LENGTH_SHORT).show();
        		
        	}
        	return true;
        }

        return false;
    }


    public void limpiarfirma(){
    	mCanvasView = (CanvasView)findViewById(R.id.canvas_view);
    	mCanvasView.clearAll();
    }
    public String getImage(){

    	mCanvasView = (CanvasView)findViewById(R.id.canvas_view);
    	String encoded = "";
    	try {
       	byte[] archivo = mCanvasView.getData();
        	 encoded =Base64.encodeToString(archivo, Base64.DEFAULT);
        	
    	}catch(Exception e) {
    		                   e.printStackTrace();
    	                     }
		return encoded;

    }
    
    public boolean saveCanvas() {
    
        
        byte[] buffer = mCanvasView.getData();

        if (buffer == null)
            return false;
        if (!(mFolder.exists()))
            mFolder.mkdirs();
  
        String savePath = mFolder.getPath() + '/' + ExampleUtils.getUniqueFilename(mFolder, "image", SAVED_FILE_EXTENSION);
      

        if (ExampleUtils.writeBytedata(savePath, buffer))
            return true;
        else
            return false;
    };
    CanvasView.InitializeFinishListener mInitializeFinishListener = new CanvasView.InitializeFinishListener() {

        public void onFinish() {
            Bitmap bg = BitmapFactory.decodeResource(getResources(), R.drawable.smemo_bg);
            mCanvasView.setBackgroundImage(bg);
            bg.recycle();
        }
    };  
}

