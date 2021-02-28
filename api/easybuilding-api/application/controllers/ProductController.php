<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class ProductController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	}
	 
	
	public function getParentCategory(){   
		return $this->getAllData__('parent_categories');
	}

	public function getAllCategories(){   
		$search_index = array(
			'columns' => '*' ,   
			'table' => 'product_categories',
			'eq_table_col' => '1 ORDER BY cat_name ASC',
			'data' => '1', 
		);

		return $this->selectCustomData__($search_index); 
	}

	public function getNextTableID(){   
		return $this->getNextID('customers');  
	}


	public function getProductsDT(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('p.product_id', 'p.product_name', 'p.product_price'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => 'p.*, cc.company_id, cc.display_name, cc.client_id, c.provider_id, cl2.cat_lvl2_name' ,   
				'table' => 'products p , client_company cc, clients c, `categories-level2` cl2 ',
				'data' => 'p.company_id=cc.company_id AND p.product_category=cl2.cat_lvl2_id AND c.client_id=cc.client_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => 'p.*, cc.company_id, cc.display_name, cc.client_id, cl2.cat_lvl2_name' ,   
				'table' => 'products p , client_company cc, `categories-level2` cl2 ',
				'data' => 'p.company_id=cc.company_id AND p.product_category=cl2.cat_lvl2_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

			  
			$data = json_decode($this->selectCustomData__($search1)->final_output, true);
	  
	  
			$result = (object) array(
				'draw' => intval($this->input->get('draw')),
				'recordsTotal' => $this->CommonQueryModel->count_filtered($get_data),
				'recordsFiltered' => $this->CommonQueryModel->count_filtered($get_data),
				"data" => $data['data'] 

			);  
	   		
	   		return $this->returnJSON($result);

		}else{
			return $this->invalidSession(); 
		}
		
	}



	public function addNewCategory(){  
		$dataset = $this->input->post();
		return $this->insertData__('product_categories', $dataset);  
	}


	public function addNewProduct(){  
		$dataset = $this->input->post();
		return $this->insertData__('product', $dataset);  
	}

	public function addProductPrice(){  
		$dataset = $this->input->post();
		return $this->insertData__('product_prices', $dataset);  
	}

	

	public function getCategoryDetails(){  
		$search_index = array(
			'columns' => '*' ,   
			'table' => 'product_categories',
			'eq_table_col' => '1',
			'data' => 'cat_id= "'.$this->input->post('cat_id').'"', 
		);

		return $this->selectCustomData__($search_index);
	}


	public function getSingleProduct(){  
		$search_index = array(
			'columns' => 'p.*, pc.cat_name, pp.price, pp.barcode' ,   
			'table' => 'product p, product_categories pc, product_prices pp',
			'eq_table_col' => '1',
			'data' => 'p .cat_id=pc.cat_id AND p.product_id=pp.product_id AND p.product_id= "'.$this->input->post('product_id').'"', 
		);

		return $this->selectCustomData__($search_index);
	}

		  

	public function getCategories(){  
 
		$dt = $this->dataTableInitialValues(); 
		$search_columns = array('pc.cat_id', 'pc.cat_name', 'prc.parent_cat_name'); 

     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
		$selectedOrd = 'desc'; //$dt['get_order'];
		$orderedCol = $dt['get_column_name'];		

		$search1 = array(
			'columns' => 'pc.*, prc.*' ,   
			'table' => 'product_categories pc, parent_categories prc',
			'data' => 'pc.parent_cat_id=prc.parent_cat_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
			'eq_table_col' => ''
		); 

	 
	
		$get_data = array(
			'columns' => '*' ,   
			'table' => 'product_categories',
			'data' => '1',
		); 

		  
		$data = json_decode($this->selectCustomData__($search1)->final_output, true);

		//print_r($search);
 		  
		$result = (object) array(
			'draw' => intval($this->input->get('draw')),
			'recordsTotal' => $this->CommonQueryModel->count_filtered($get_data),
			'recordsFiltered' => $this->CommonQueryModel->count_filtered($get_data),
			"data" => $data['data'] 

		);  
   		
   		return $this->returnJSON($result);
	}


	public function getProducts(){  
 
		$dt = $this->dataTableInitialValues(); 
		$search_columns = array('p.product_id', 'p.product_name', 'pc.cat_name', 'pp.barcode'); 

     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
		$selectedOrd = 'desc'; //$dt['get_order'];
		$orderedCol = $dt['get_column_name'];		

		$search1 = array(
			'columns' => 'p.*, pc.cat_name, pp.price, pp.barcode' ,   
			'table' => 'product p, product_categories pc, product_prices pp',
			'data' => 'p.cat_id=pc.cat_id AND p.product_id=pp.product_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
			'eq_table_col' => ''
		); 

	 
	
		$get_data = array(
			'columns' => '*' ,   
			'table' => 'product',
			'data' => '1',
		); 

		  
		$data = json_decode($this->selectCustomData__($search1)->final_output, true);

		//print_r($search);
 		  
		$result = (object) array(
			'draw' => intval($this->input->get('draw')),
			'recordsTotal' => $this->CommonQueryModel->count_filtered($get_data),
			'recordsFiltered' => $this->CommonQueryModel->count_filtered($get_data),
			"data" => $data['data'] 

		);  
   		
   		return $this->returnJSON($result);
	}


	public function editCategory(){  
		$dataset = $this->input->post(); 
		return $this->updateData__('product_categories', $dataset,'cat_id="'.$this->input->post('cat_id').'"');  
	}
 
	public function editProduct(){  
		$dataset = $this->input->post(); 
		return $this->updateData__('product', $dataset,'product_id="'.$this->input->post('product_id').'"');  
	}

	public function editProductPrice(){  
		$dataset = $this->input->post(); 
		return $this->updateData__('product_prices', $dataset,'product_id="'.$this->input->post('product_id').'"');  
	}

	

	public function deleteCategory(){   
		return $this->deleteData__('product_categories','cat_id="'.$this->input->post('cat_id').'"');  
	}

	public function deleteProduct(){   
		$this->deleteData__('product_prices','product_id="'.$this->input->post('product_id').'"');
		return $this->deleteData__('product','product_id="'.$this->input->post('product_id').'"');  
	}

	public function fileUpload(){ 
 
 	   return $this->fileUpload__($_POST, $_FILES);
 
	} 

	public function removeFile(){    
		$file_name = $this->input->post('file_name'); 
		return $this->deleteUploadedFile($file_name);  
	}
	 
 
}
