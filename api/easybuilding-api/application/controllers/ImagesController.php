<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class ImagesController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	} 

	public function getNextTableID(){   
		return $this->getNextID('customers');  
	}  
	

	public function getImageDetailsDT(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('p.project_id', 'p.project_name', 'pi.img_id', 'pi.file_name', "cc.display_name"); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => 'pi.*, p.project_name, cc.display_name, cc.company_id, cc.client_id, c.provider_id' ,   
				'table' => 'project_images pi, project p , client_company cc, clients c ',
				'data' => 'c.client_id=cc.client_id AND p.project_id=pi.project_id AND p.company_id=cc.company_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => 'pi.*, p.project_name, cc.display_name' ,   
				'table' => 'project_images pi, project p , client_company cc ',
				'data' => 'p.project_id=pi.project_id AND p.company_id=cc.company_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.'',
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


	public function getImageCategories(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$search_lvl1 = array(
				'columns' => 'cat_lvl1_id, cat_lvl1_name' ,   
				'table' => '`categories-level1`',
				'eq_table_col' => '1 order by cat_lvl1_name ASC',
				'data' => 'parent_cat_id="C1022"', 
			);

			$dataset = $this->selectRawCustomData__($search_lvl1);
			$all_categories = array(); 

			foreach ($dataset["data"] as $value) {   

				$search_lvl2 = array(
					'columns' => 'cat_lvl2_id AS id, cat_lvl2_name AS text' ,   
					'table' => '`categories-level2`',
					'eq_table_col' => '1 order by cat_lvl2_name ASC',
					'data' => 'parent_cat_id="'.$value->cat_lvl1_id.'"', 
				);

				$dataset_lvl2 = $this->selectRawCustomData__($search_lvl2);

				$sub_categories = array(
					'id' => $value->cat_lvl1_id , 
					'text' => $value->cat_lvl1_name , 
					'children' => $dataset_lvl2['data'] 
				);

				array_push($all_categories, $sub_categories);
				
			}
			
			$data = array( 
				'status' => 200, 
				'data' => $all_categories, 
			);
			
			return $this->returnJSON($data);   
			

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function saveImageCategories(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
  
			$photo_category = json_decode($dataset['photo_category']); 

			 
			 

			$img_id = $dataset['img_id']; 

			$this->deleteData__('image_category_list', 'img_id="'.$this->input->post('img_id').'"') ;
 
			if (!empty($photo_category)) {
				$this->insertImageCategory($photo_category, $img_id);
			}
			
			$projectImgData = $this->updateData__('project_images', $dataset, 'img_id="'.$this->input->post('img_id').'"');


			$approvedData = array('approved' => 0 );

			if ($this->getApprovedImagesCount()["data"][0]->no_of_approved > 0) {
				$approvedData["approved"] = 1;
			}else{
				$approvedData["approved"] = 0;
			}
			 
			$this->updateData__('project', $approvedData, 'project_id="'.$this->input->post('project_id').'"');

			return $projectImgData;

		}else{
			return $this->invalidSession(); 
		} 

	} 


	public function insertImageCategory($photo_category, $img_id){  

 		foreach ($photo_category as $value) {

			$dataset = array(
				'cat_lvl2_id' => $value , 
				'img_id' => $img_id , 
			); 

			$this->insertData__('image_category_list', $dataset);
		    	
		} 
	}


	public function getSingleImageCategory(){  
   
		$search_index = array(
			'columns' => 'photo_category' ,   
			'table' => 'project_images',
			'eq_table_col' => '1',
			'data' => 'img_id= "'.$this->input->post('img_id').'"', 
		);
 

		return $this->selectCustomData__($search_index); 
		
	}


	public function getApprovedImagesCount(){  
   
		$search_index = array(
			'columns' => 'COUNT(approved) as no_of_approved' ,   
			'table' => 'project_images',
			'eq_table_col' => '1',
			'data' => 'project_id= "'.$this->input->post('project_id').'" AND  approved=1', 
		);
 

		return $this->selectRawCustomData__($search_index); 
		
	}
 

 
}
