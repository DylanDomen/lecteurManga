package lecteurManga.servlet;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;


import lecteurManga.model.Account;

@WebServlet("/lecteurManga")
@MultipartConfig
public class Signup extends HttpServlet {
	

    /**
	 * 
	 */
	private static final long serialVersionUID = 6938585477374990285L;
	//private final static String serverPath = "/documents/lecteurManga";


	/**
     * Default constructor. 
     */
    public Signup() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		        this.getServletContext().getRequestDispatcher("/WEB-INF/test.html").forward(request, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String serverPath = getServletContext().getRealPath("/");

      
        final Part filePart = request.getPart("fichier");
        String fileName = getFileName(filePart);

     

        OutputStream out = null;
        InputStream filecontent = null;
        final PrintWriter writer = response.getWriter();
     
        try {
          out = new FileOutputStream(new File(serverPath + File.separator + fileName));
          filecontent = filePart.getInputStream();
     
          int read = 0;
          final byte[] bytes = new byte[1024];
     
          while ((read = filecontent.read(bytes)) != -1) {
            out.write(bytes, 0, read);
          }
         // writer.println("New file " + fileName + " created at " + serverPath);
            String nom = fileName;
            String nom2 = serverPath;

        
           request.setAttribute("nom", nom);
            request.setAttribute("nom2", nom2);
            

    		  this.getServletContext().getRequestDispatcher("/WEB-INF/view_img.jsp").forward(request, response);
    	



     
        } catch (FileNotFoundException fne) {
          writer.println("Missing file or no insufficient permissions.");
          writer.println(" ERROR: " + fne.getMessage());
        } finally {
          if (out != null) {
            out.close();
          }
          if (filecontent != null) {
            filecontent.close();
          }
          if (writer != null) {
            writer.close();
          }
        }

	}

	


	 private String getFileName(Part filePart) {
		    String header = filePart.getHeader("content-disposition");
		    String name = header.substring(header.indexOf("filename=\"")+10);
		    return name.substring(0, name.indexOf("\""));
		  }
}
